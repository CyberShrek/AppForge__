class e{set core(e){if(this.coreElement)throw new Error("The core cannot be reassigned");this.coreElement=e,this.insertCallback=this.insertCallback?this.insertCallback():null}get core(){return this.coreElement}constructor(e){this.addClass=e=>this.core.classList.add(e),this.removeClass=e=>this.core.classList.remove(e),this.toggleClass=e=>this.core.classList.toggle(e),this.insertCallback=()=>{e.position?e.target.insertAdjacentElement(e.position,this.coreElement):e.target.replaceWith(this.coreElement)}}set class(e){this.core.className=e}get class(){return this.core.className}}export{e as F};
//# sourceMappingURL=Fragment-f98e71fe.js.map
