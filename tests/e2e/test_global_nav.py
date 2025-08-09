from playwright.sync_api import Page, expect


def test_header_and_footer(page: Page):
    page.goto("http://localhost:4321/")
    # Header links visible
    expect(page.get_by_role("link", name="Home")).to_be_visible()
    expect(page.get_by_role("link", name="Meet Chris")).to_be_visible()
    expect(page.get_by_role("link", name="Issues")).to_be_visible()
    expect(page.get_by_role("link", name="News")).to_be_visible()
    expect(page.get_by_role("link", name="Get Involved")).to_be_visible()
    # Donate acts as button; fallback to link if role not set by browser
    donate = page.get_by_role("button", name="Donate")
    if not donate.count():
        donate = page.get_by_role("link", name="Donate")
    expect(donate).to_be_visible()
    expect(page.get_by_role("link", name="Español")).to_be_visible()

    # Footer contains disclaimer
    footer_text = page.locator("footer").inner_text()
    assert "Paid for by" in footer_text


def test_es_lang_attribute(page: Page):
    page.goto("http://localhost:4321/es")
    # Ensure lang attribute is spanish
    lang = page.locator("html").get_attribute("lang")
    assert lang == "es"

