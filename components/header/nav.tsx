
function Links() {
    return (<>
        <a href={'/about'}>About</a>
        <a href={'/contact'}>Contact</a>
    </>);
}

function Nav() {
    return <>
        <nav>
            <Links></Links>
        </nav>
    </>;
}

export default Nav;