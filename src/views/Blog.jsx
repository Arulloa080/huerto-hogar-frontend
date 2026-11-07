const Blog = () => {
  const posts = [
    { id: 1, titulo: "Cómo cuidar tus suculentas", resumen: "Aprende los secretos del riego perfecto." },
    { id: 2, titulo: "Huerto en departamento", resumen: "Maximiza tu espacio en el balcón." }
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: '#8B4513' }}>Nuestro Blog</h2>
      <div className="row">
        {posts.map(post => (
          <div className="col-md-6 mb-4" key={post.id}>
            <div className="card h-100 shadow-sm border-0 bg-light">
              <div className="card-body">
                <h4 className="card-title text-success">{post.titulo}</h4>
                <p className="card-text">{post.resumen}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;