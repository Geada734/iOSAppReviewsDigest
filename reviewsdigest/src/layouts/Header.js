import classes from './Header.module.css'

function Header () {
    return (
        <header className={classes.header}>
            <div className={classes.titleText}>Reviews Digests</div>
        </header>
    );
}

export default Header;