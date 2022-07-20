var navigation = document.querySelector(".navigation"),
    menuBtn = document.querySelector(".bars"),
    menudivs = document.querySelectorAll(".menu div");

menuBtn.addEventListener("click",e=>{
    menuBtn.classList.toggle("clicked")
    navigation.classList.toggle("show-menu")
})
menudivs.forEach(e=>{
    e.querySelector("button").addEventListener("click",(t)=>{
        
        e.classList.toggle("show-li")
    })
})
