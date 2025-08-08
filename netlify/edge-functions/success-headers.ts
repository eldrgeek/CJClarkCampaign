export default async (request, context) => {
  const response = await context.next();
  response.headers.set("Cache-Control", "no-store");
  return response;
};
