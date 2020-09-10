const Header = ({sidebar, setSidebar}) => {
  return(
    <div style={{
      position: "fixed",
      width: "100%",
      height: "60px",
      display: "flex",
      alignItems: "center",
      boxShadow: "0 2px 8px #f0f1f2",
      zIndex: "999",
      backgroundColor: "white"
    }}>
      <div>
        <img onClick={() => {
          setSidebar(!sidebar)
        }} src="/menu-abierto.svg" style={{ width: "25px", margin: "1rem" }} className="click" />
      </div>
    </div>
  )
}

export default Header