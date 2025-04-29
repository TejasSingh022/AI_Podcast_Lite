function Home() {
  return (
    <div>
      <form>
        <input 
            id="prompt" 
            name="prompt" 
            placeholder="Enter prompt: "
            className="m-4 text-2xl"/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Home
