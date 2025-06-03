module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://backend:4000/api/:path*", // backend = nom du service docker
      },
    ];
  },
};
