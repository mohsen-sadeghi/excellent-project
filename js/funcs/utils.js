const showSwal = (title , icon , buttons , callback)=>{
    swal({
        title: title,
        icon: icon,
        button: buttons,
      }).then((result) => callback(result))
} 

const setToLocalStorage = (key , value)=>{
    return localStorage.setItem(key , JSON.stringify(value))
}

const getToLocalStorage = (key)=>{
    return JSON.parse(localStorage.getItem(key))
}

const getToken = ()=>{
    const token = getToLocalStorage('token')
    return token ? token : false
}

const isLogin = ()=>{
    const token = getToLocalStorage('token')
    return token ? true : false
}

const getUrlParamInUrl = (param)=>{
    let url = new URL(location.href);
    let parament = url.searchParams.get(param);
    return parament
}

const paginateItem = (array , parent , currentPage , itemsPerPages , link)=>{
    const endIndex = currentPage * itemsPerPages
    const startIndex = endIndex - itemsPerPages
    const sliceArray = array.slice(startIndex , endIndex)
    const numberOfPages = Math.ceil(array.length / itemsPerPages)
    for(let i = 1 ; i <= numberOfPages ; i++){
        parent.insertAdjacentHTML('beforeend' , `
                <li class="paginate__item">
                    <a href="${link}?paginate=${i}" class="${currentPage == i ? 'paginate__link paginate__link--active' : 'paginate__link'}">${i}</a>
                </li>
            `)
    }


    return sliceArray
}

export {showSwal , setToLocalStorage , getToLocalStorage , getToken , isLogin , getUrlParamInUrl , paginateItem}