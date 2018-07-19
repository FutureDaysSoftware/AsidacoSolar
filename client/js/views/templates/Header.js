module.exports = function( { model } ) {
const navOptions = model.data.map( datum => `<li data-name="${datum.name}">${datum.label}</li>` ).join('')
return `` +
`<header>
    <div><img src="/static/img/AsidacoLogo.jpg"></div>
    <div class="solar">solar</div>
    <nav data-js="navList">${navOptions}</nav>
</header>
`
}
