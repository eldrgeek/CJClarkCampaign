import os
import subprocess
import time
import signal
import sys
import pytest

ASTRO_PORT = os.environ.get("ASTRO_PORT", "4321")
BASE_URL = f"http://localhost:{ASTRO_PORT}"

@pytest.fixture(scope="session", autouse=True)
def astro_server():
    """Build once and serve via `astro preview` for stable E2E tests."""
    env = os.environ.copy()
    env["BROWSER"] = "none"

    # Build only if no prior build exists
    if not os.path.exists(os.path.join(os.getcwd(), "dist", "index.html")):
        build = subprocess.run(["npm", "run", "build"], cwd=os.getcwd(), env=env)
        if build.returncode != 0:
            pytest.exit("Astro build failed; cannot run tests")

    proc = subprocess.Popen(
        ["npm", "run", "preview", "--", "--port", ASTRO_PORT],
        cwd=os.getcwd(),
        env=env,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )

    # Wait for server to start
    start = time.time()
    ready = False
    while time.time() - start < 30:
        try:
            import urllib.request
            with urllib.request.urlopen(BASE_URL) as resp:
                if resp.status < 500:
                    ready = True
                    break
        except Exception:
            time.sleep(0.5)
    if not ready:
        try:
            proc.terminate()
        except Exception:
            pass
        pytest.exit("Astro preview did not become ready")

    yield BASE_URL

    # Teardown server
    try:
        if sys.platform.startswith("win"):
            proc.send_signal(signal.CTRL_BREAK_EVENT)
        else:
            proc.terminate()
    except Exception:
        pass
    try:
        proc.wait(timeout=10)
    except Exception:
        pass