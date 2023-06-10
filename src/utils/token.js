export async function decodeToken(token) {
  return await JSON.parse(
    decodeURIComponent(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    )
  );
}
