let currentUser = '';
let seller='';

// Set the user as logged in
export const setLoggedIn = (user) => {
  //console.log(user);
  localStorage.removeItem("currentUser");
  localStorage.setItem("currentUser", JSON.stringify(user));
  currentUser=JSON.stringify(user);
};
export const setSeller = (no) => {
  //console.log(user);
  localStorage.removeItem("seller");
  localStorage.setItem("seller", JSON.stringify(no));
  seller=JSON.stringify(no);
};
export const setBookToFind = (book) => {
  //console.log(user);
  localStorage.setItem("bookToFind", JSON.stringify(book));
};

// Set the user as logged out
export const setLoggedOut = () => {
  localStorage.setItem(currentUser, 'false');
};
export const findUser = ()=>{  
    const currentUserString = window.localStorage.getItem("currentUser");
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      return currentUser;
    } else {
      console.log("currentUser is not found in localStorage");
    }
  };
  export const findSeller = ()=>{  
    seller = window.localStorage.getItem("currentUser");
    if (seller) {
      const currentSeller = JSON.parse(seller);
      return currentSeller;
    } else {
      console.log("currentSeller is not found in localStorage");
    }
  };
  export const findBookToFind = ()=>{  
    const bookToFindString = window.localStorage.getItem("bookToFind");
    if (bookToFindString) {
      const bookToFind = JSON.parse(bookToFindString);
      return bookToFind;
    } else {
      console.log("bookToFind is not found in localStorage");
    }
  }
