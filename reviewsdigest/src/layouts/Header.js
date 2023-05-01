import classes from './Header.module.css'

/* 
* Header for the app title.    
*/
function Header () {
    return (
        <header className={classes.header}>
            <div className={classes.titleText}>Reviews Digests</div>
        </header>
    );
}

export default Header;