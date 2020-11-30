const template = document.createElement('template');

template.innerHTML = `
<style>
  .user-card {
    display:flex;
    position: relative;
    width: 500px;
    margin-bottom: 15px;
    font-family: 'Open Sans', 'Arial', sans-serif;
    ext-align:left;
    background: #FFF;
    border:  2px solid #333;
    border-radius: 10px;
    box-shadow: -3px 3px 6px rgba(0,0,0,0.25);
    overflow: scroll;
  }

  .user-card .left {
    flex: 1;
    border-right: 2px solid #333;
  }

  .user-card img {
    display:block;
    width: 100%;
  }

  .user-card .right {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
  }

  .info-container {
    flex: 1;
  }

  .user-card .right h3,
  .user-card .right p {
    margin-top: 0;
  }

  #toggle-info-button {
    padding: 5px 10px;
    font-size: 16px;
    color: #FFF;
    cursor: pointer;
    background-color: #61DAFB;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: 5px;
    box-shadow: -2px 2px 4px rgba(0,0,0,0.25);
  }

  #toggle-info-button:focus {
    outline: none;
  }

  #toggle-info-button:active {
    outline: none;
    box-shadow: none;
  }
</style>


<div class="user-card">
  <div class="left">
    <img alt="avatar"/>
  </div>


  <div class="right">
    <h3></h3>

    <div class="info-container">
      <div class="info-content">
        <div><slot name="skills"/></div>
        <p><strong>Email:</strong> <slot name="email" /></p>
        <p><strong>Phone:</strong> <slot name="phone" /></p>
      </div>
    </div>

    <button id="toggle-info-button">Hide Info</button>
  </div>
</div>
`;


/* =============================================================================

============================================================================= */


class UserCard extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('img').src      = this.getAttribute('avatar');
    this.toggleInfo                               = this.toggleInfo.bind(this);
    this.showInfo = true;
  }


  toggleInfo(){
    this.showInfo     = !this.showInfo;
    const infoContent = this.shadowRoot.querySelector('.info-content');
    const toggleBtn   = this.shadowRoot.querySelector('#toggle-info-button');

    if(this.showInfo){
      infoContent.style.display = 'block';
      toggleBtn.innerText       = 'Hide Info';
    } else {
      infoContent.style.display = 'none';
      toggleBtn.innerText       = 'Show Info';
    }
  }


  connectedCallback(){
    this.shadowRoot.querySelector('#toggle-info-button').addEventListener('click', this.toggleInfo);
  }


  disconnectedCallback(){
    this.shadowRoot.querySelector('#toggle-info-button').removeEventListener('click', this.toggleInfo);
  }
}


window.customElements.define('user-card', UserCard);
