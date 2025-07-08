import image from "./images/chef-claude-icon.png"

export default function Header() {
    return (
        <header>
             <img src={image} alt="Chef Claude Icon" />
             <h1>Chef Claude</h1>
        </header>
    )
}