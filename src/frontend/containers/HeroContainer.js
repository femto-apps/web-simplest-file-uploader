function HeroContainer({ children, className }) {
    return (
        <section className="hero is-fullheight">
            <div style={{ textAlign: 'center' }}>BETA: FILES WILL NOT BE RETAINED</div>

            <div className="hero-body">
                <div className={`container ${className}`}>
                    {children}
                </div>
            </div>
        </section>
    )
}

export default HeroContainer