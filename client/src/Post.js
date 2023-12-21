export default function Post(){
    return(
        <div className="post">
        <div className="image">
          <img
            src="https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Fish-Tacos-1337495.jpg?quality=90&webp=true&resize=300,272"
            alt=""
          />
        </div>
        <div className="texts">
          <h2>Easy dinner recipes</h2>
          <p className="info">
            <a className="author">Daniel Wosik</a>
            <time>19-12-2023 13:41 </time>
          </p>
          <p className="summary">
            Save yourself stress in the kitchen with our easy dinner ideas, from
            fresh tacos and hearty pasta bakes to warming curries and simple
            traybakes everyone will love.{" "}
          </p>
        </div>
      </div>
    )
}