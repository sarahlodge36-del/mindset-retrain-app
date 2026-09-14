function Home({ onStart }) {
  return (
    <div style={{
      textAlign: "center",
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh"
    }}>
      <img 
        src="/mindsetretrainlogo.jpeg" 
        alt="Mindset Retrain Logo"
        style={{
          maxWidth: "400px",
          width: "100%",
          marginBottom: "30px",
          borderRadius: "10px"
        }}
      />
      
      <h1 style={{color: "#d4af37", fontSize: "2.5em", marginBottom: "20px"}}>
        Mindset Retrain
      </h1>
      
      <p style={{fontSize: "1.1em", marginBottom: "30px", maxWidth: "500px"}}>
        Your personal companion for mindfulness, wellness, and positive growth.
      </p>
      
      <button onClick={onStart} style={{fontSize: "1.1em", padding: "15px 40px"}}>
        Start Your Journey
      </button>
    </div>
  );
}

export default Home;