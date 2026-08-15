export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      if (
        !url.pathname.startsWith("/block-analytics") ||
        request.method !== "POST"
      )
        return Response.json({ status: 400, message: "invalid request" });

      const body = await request.json();
      if (body.id == null)
        return Response.json({
          status: 400,
          message: "invalid request: id not provided",
        });

      await env.analytics_blocks
        .prepare(
          "insert into blocks (id, did_block) values (?, true) on conflict(id) do update set did_block = true",
        )
        .bind(body.id)
        .run();

      return Response.json({ status: 200, message: "ok" });
    } catch {
      return Response.json({ status: 500, message: "internal server error" });
    }
  },
};
