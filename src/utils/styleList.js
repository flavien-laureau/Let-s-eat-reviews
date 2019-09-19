export default function styleList(){
    const imgs = document.querySelectorAll('.img-restau')
    const imgsWrapper = document.querySelectorAll('.img-wrapper')
    const links = document.querySelectorAll('.more')
    
    imgs.forEach(img => {
        img.addEventListener('mouseover', function() {
            img.parentElement.previousElementSibling.style.opacity = "1";
            img.style.width = "160px";
        });
        img.addEventListener('mouseout', function() {
            img.parentElement.previousElementSibling.style.opacity = "0";
            img.style.width = "150px";
        });
    });

    imgsWrapper.forEach(wrapper => {
        wrapper.addEventListener('mouseover', function() {
            wrapper.style.padding = "5px";
            wrapper.style.transform = "rotate(5deg)";
        });
        wrapper.addEventListener('mouseout', function() {
            wrapper.style.padding = "10px";
            wrapper.style.transform = "rotate(0deg)";
            
        });
    });

    links.forEach(link => {
        link.addEventListener('mouseover', function() {
            link.style.opacity = "1";
            link.nextElementSibling.firstChild.style.width = "160px";
            link.nextElementSibling.style.padding = "5px";
            link.nextElementSibling.style.transform = "rotate(5deg)";

        });
        link.addEventListener('mouseout', function() {
            link.style.opacity = "0";
            link.nextElementSibling.firstChild.style.width = "150px";
            link.nextElementSibling.style.padding = "10px";
            link.nextElementSibling.style.transform = "rotate(0deg)";
        });
    });
}