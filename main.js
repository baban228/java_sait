(()=>{"use strict";const e=e=>{e.preventDefault()},t=(e,t)=>{const r=e.querySelector(t.submitButtonSelector),o=e.checkValidity();r.disabled=!o,r.classList.toggle("popup__button_disabled",!o)},r=document.querySelector(".popup_type_profile"),o=document.querySelector(".profile__edit-buton"),n=r.querySelector(".popup__form_type_profile"),p=document.querySelector(".profile-info__title"),l=document.querySelector(".profile-info__intro"),c=document.querySelector(".popup__input_type_name"),u=document.querySelector(".popup__input_type_job"),a=document.querySelector(".popup_type_place"),s=document.querySelector(".profile__add-button"),d=a.querySelector(".popup__form_type_place"),i=a.querySelector(".popup__input_type_title"),_=a.querySelector(".popup__input_type_link"),m=document.querySelector(".popup_type_image"),y=document.querySelector(".popup__img"),v=document.querySelector(".popup__name"),S=document.querySelectorAll(".popup__button-close"),f=document.querySelectorAll(".popup"),k=document.querySelector(".template-card").content,q=document.querySelector(".elements"),E=e=>{const t=k.cloneNode(!0),r=t.querySelector(".element__title"),o=t.querySelector(".element__img"),n=t.querySelector(".element__button"),p=t.querySelector(".element__basket");return r.textContent=e.name,o.src=e.link,o.alt=e.alt,g(o),n.addEventListener("click",(e=>{e.target.classList.toggle("element__button_active")})),(e=>{e.addEventListener("click",(e=>{e.target.closest(".element").remove()}))})(p),t},g=e=>{e.addEventListener("click",(t=>{b(m),y.src=e.src,y.alt=e.alt,v.textContent=t.target.closest(".element").textContent}))};[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",alt:"Изображение низких гор покрытых зеленью и снегом"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",alt:"Изображение реки с берегами покрытым первым снегом"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",alt:"Изображение квартала многоэтажных домов в вечернее время"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",alt:"Изображение лишайника на склоне сопок Камчатки"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",alt:"Изображение железной дороги идущей вдоль низких посадок деревьев"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",alt:"Изображение крутого берега озера Байкал присыпанного снегом"}].forEach((e=>{q.append(E(e))}));const b=e=>{e.classList.add("popup_opened"),document.addEventListener("keydown",h)},L=e=>{e.classList.remove("popup_opened"),document.removeEventListener("keydown",h)},h=e=>{"Escape"===e.key&&f.forEach((e=>{L(e)}))};o.addEventListener("click",(()=>{b(r),c.value=p.textContent,u.value=l.textContent})),n.addEventListener("submit",(e=>{e.preventDefault(),p.textContent=c.value,l.textContent=u.value,L(r)})),S.forEach((e=>{e.addEventListener("click",(e=>{const t=C(e);L(t)}))})),f.forEach((e=>{e.addEventListener("click",(e=>{if(e.target===e.currentTarget){const t=C(e);L(t)}}))})),s.addEventListener("click",(()=>{b(a),i.value="",_.value=""})),d.addEventListener("submit",(e=>{e.preventDefault(),x({name:i.value,link:_.value}),e.target.reset(),L(a)}));const x=e=>{q.prepend(E(e))},C=e=>e.target.closest(".popup");var j;j={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},Array.from(document.querySelectorAll(j.formSelector)).forEach((r=>{r.addEventListener("submit",e),r.addEventListener("input",(()=>{t(r,j)})),((e,t)=>{Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(e){e.addEventListener("input",(e=>{((e,t)=>{const r=e.target,o=r.id,n=document.querySelector(`#${o}-error`);r.validity.valid?(r.classList.remove(t.inputErrorClass),n.textContent=""):(r.classList.add(t.inputErrorClass),n.textContent=r.validationMessage)})(e,t)}))}))})(r,j),t(r,j)}))})();