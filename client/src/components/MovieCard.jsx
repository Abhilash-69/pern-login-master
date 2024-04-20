export const MovieCard = ({ image, name }) => {
    return (
      <div className="movie" style={{  backgroundColor: 'rgba(0,0,0,0.65)',display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',maxWidth: '10vw',borderRadius: '1rem',minHeight: '30vh'}}>
        <img src={image} alt="" className="poster" style={{width: '10vw',borderTopLeftRadius: '1rem',borderTopRightRadius: '1rem'
}} />
        <span className="texti" style={{  fontSize: '1.25rem',textAlign: 'center',paddingTop: '0.75rem',paddingBottom: '0.75rem',paddingLeft: '0.5rem',paddingRight: '0.5rem',color: '#fff'}}>
          {name}
        </span>
      </div>
    )
  }