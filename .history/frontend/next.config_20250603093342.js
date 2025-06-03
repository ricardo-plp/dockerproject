module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://backend:4000/:path*", // le nom de ton conteneur backend
      },
    ];
  },
};
