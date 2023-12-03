import { useState } from "react";
import "./addbook.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { calcLength } from "framer-motion";

function Addbook() {
  const [name, setname] = useState();
  const [catagory, setCatagory] = useState();
  const [author, setAuthor] = useState();
  const [sellingprice, setsellingprice] = useState();
  const [lendingPrice, setlendingPrice] = useState();
  const [duration, setduration] = useState();
  const [fileContent, setFileContent] = useState('');
  const navigate = useNavigate();

  const imageStorageKey = "3ace044b7c7d9d5697f7eb8c463d2b4a";
  const urlImageBB = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFileContent(file);
    console.log(file);
    // if (file) {
    //   try {
    //     const content = await readFileContent(file);
    //     setFileContent(content);
    //     console.log(content);
    //   } catch (error) {
    //     console.error('Error reading the file:', error);
    //   }
    // }


    
  };

  const handleAddCustomer = async (e) => {

    const image = fileContent;
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

      e.preventDefault();

console.log(sellingprice);


    
    
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(
        (imgData) => {
        if (imgData.success){
          const copiesData = [
            { sellPrice: sellingprice * 1, lendPrice: lendingPrice *1 },
            // ... more copies data
          ];
          
          console.log(copiesData);
          
          
          // Create requestBody
          const requestBody = {
            title: name,
            author: author,
            genres: Array.isArray(catagory) ? catagory : [catagory],
            rating: 0.0,
            pages:0,
            image: imgData.data.url,
            price:0,
            reviews: [
              {
                  name: "Shayla",
                  comment:"Good",
              },
            ],
          
            copies: copiesData.map(copy => ({
                owner: JSON.parse(localStorage.getItem('currentUser')).email,
                current_holder: JSON.parse(localStorage.getItem('currentUser')).email,
                selling_price: copy.sellPrice * 1,
                rental_price: copy.lendPrice * 1,
            })),
          };
          console.log(requestBody)
          const requestBody2 = {
            
            title: name,
            copies: copiesData.map(copy => ({
                owner: JSON.parse(localStorage.getItem('currentUser')).email,
                current_holder: JSON.parse(localStorage.getItem('currentUser')).email,
                selling_price: copy.sellPrice * 1,
                rental_price: copy.lendPrice * 1,
            })),
          };
          // Use requestBody for further processing, e.g., inserting into MongoDB
          
          try{
            const respp = axios.get("http://localhost:5000/getBooks");
            const copies = respp.data;
            console.log('Egula copies: ');
            console.log(copies);
            //const owner = JSON.parse(localStorage.getItem('currentUser')).email;
           // const updatedRequests = [];
           var flag =0;
            for (let i = 0; i < copies.length; i++) {
              if (copies[i].title === name) {
                flag=1;
                try {
                  const response = axios.post("http://localhost:5000/addCopiesToBook", requestBody2);
                  console.log(response.data);
                  const data = response.data;
                  if (!data.acknowledged) {
                    toast.error("Could not add copies to the book");
                    return;
                  }
                  toast.success("Successfully added the book");
                } catch (error) {
                  console.error('AxiosError:', error);
                  if (error.response) {
                    console.log('Error response:', error.response.data);
                  }
                }
              }
            }
              if(flag===0)
              { try{
                const response = axios.post("http://localhost:5000/insertbook", requestBody);
            console.log(response.data);
            const data= response.data
              if(!data.acknowledged)
              {
                  toast.error("Could not add book");
                  return;
              }
          
              toast.success("Successfully added the book");
            // Process the data here
          } catch (error) {
            console.error('AxiosError:', error);
            if (error.response) {
              console.log('Error response:', error.response.data);
            }
          }
            }
          }catch (error) {
            console.error('AxiosError:', error);
            if (error.response) {
              console.log('Error response:', error.response.data);
            }
          }
          
          
              setTimeout(()=>{
                  navigate("/loginhomepagemodified");
              }, 1000);
         }

        })
      }
  const handleAdd = async (e) => {
    e.preventDefault();

console.log(sellingprice)

 // Assuming you have a copies array provided by the user
 const copiesData = [
  { sellPrice: sellingprice * 1, lendPrice: lendingPrice *1 },
  // ... more copies data
];

console.log(copiesData);


// Create requestBody
const requestBody = {
  title: name,
  author: author,
  genres: Array.isArray(catagory) ? catagory : [catagory],
  rating: 0.0,
  pages:0,
  image:"",
  price:0,
  reviews: [
    {
        name: "Shayla",
        comment:"Good",
    },
  ],

  copies: copiesData.map(copy => ({
      owner: JSON.parse(localStorage.getItem('currentUser')).email,
      current_holder: JSON.parse(localStorage.getItem('currentUser')).email,
      selling_price: copy.sellPrice * 1,
      rental_price: copy.lendPrice * 1,
  })),
};
console.log(requestBody)
const requestBody2 = {
  
  title: name,
  copies: copiesData.map(copy => ({
      owner: JSON.parse(localStorage.getItem('currentUser')).email,
      current_holder: JSON.parse(localStorage.getItem('currentUser')).email,
      selling_price: copy.sellPrice * 1,
      rental_price: copy.lendPrice * 1,
  })),
};
// Use requestBody for further processing, e.g., inserting into MongoDB

  


try{
  const respp = await axios.get("http://localhost:5000/getBooks");
  const copies = respp.data;
  console.log('Egula copies: ');
  console.log(copies);
  //const owner = JSON.parse(localStorage.getItem('currentUser')).email;
 // const updatedRequests = [];
 var flag =0;
  for (let i = 0; i < copies.length; i++) {
    if (copies[i].title === name) {
      flag=1;
      try {
        const response = await axios.post("http://localhost:5000/addCopiesToBook", requestBody2);
        console.log(response.data);
        const data = response.data;
        if (!data.acknowledged) {
          toast.error("Could not add copies to the book");
          return;
        }
        toast.success("Successfully added the book");
      } catch (error) {
        console.error('AxiosError:', error);
        if (error.response) {
          console.log('Error response:', error.response.data);
        }
      }
    }
  }
    if(flag===0)
    { try{
      const response = await axios.post("http://localhost:5000/insertbook", requestBody);
  console.log(response.data);
  const data= response.data
    if(!data.acknowledged)
    {
        toast.error("Could not add book");
        return;
    }

    toast.success("Successfully added the book");
  // Process the data here
} catch (error) {
  console.error('AxiosError:', error);
  if (error.response) {
    console.log('Error response:', error.response.data);
  }
}
  }
}catch (error) {
  console.error('AxiosError:', error);
  if (error.response) {
    console.log('Error response:', error.response.data);
  }
}


    setTimeout(()=>{
        navigate("/loginhomepagemodified");
    }, 1000);

  };

  return (
    <div>
      <div className="buyborrowbook-page">
        <div className="overlap-wrapper">
          <div className="overlap">
            <div className="rectangle"></div>
            <img className="nav-bg" src="img/NavBg.png" />
            <div className="div"></div>
            <form className="frame" onSubmit={handleAddCustomer}>
              <div className="overlap-group">
                <p className="h">Add a Book for Borrow/Buy</p>
                <div className="firstname-input">
                  <div className="text-wrapper">
                    <input
                      className="inputName"
                      type="text"
                      placeholder="Enter Book Name"
                      onChange={(e) => {
                        setname(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <p className="form-control">
                  <span className="span">Book Name </span>{" "}
                  <span className="text-wrapper-2">*</span>
                </p>
                <div className="overlap-2">
                  <div className="country-input">
                    <div className="text-wrapper">
                      <select
                        className="input"
                        name="Catagory"
                        onChange={(e) => {
                          setCatagory(e.target.value);
                        }}
                      >
                        <option value="None">Select Catagory</option>
                        <option value="Novel">Novel</option>
                        <option value="Science_Fiction">Science Fiction</option>
                        <option value="Islamic_Books">Islamic Books</option>
                        <option value="Biography">Biography</option>
                        <option value="Kids">Kids</option>
                        <option value="Computer">Computer</option>
                        <option value="History">History</option>
                        <option value="Comics">Comics</option>
                      </select>
                    </div>
                  </div>
                  <p className="p">
                    <span className="span">Book Catagory </span>{" "}
                    <span className="text-wrapper-2">*</span>
                  </p>
                </div>
                <div className="overlap-3">
                  <div className="country-input-2">
                    <div className="text-wrapper">
                      <select
                        className="input"
                        name="Author"
                        onChange={(e) => {
                          setAuthor(e.target.value);
                        }}
                      >
                        <option value="None">Select Author</option>
                        <option value="Rabindranath">
                          Rabindranath Tagore
                        </option>
                        <option value="Nazrul">Kazi Nazrul Islam</option>
                        <option value="Ayman">Ayman Sadiq</option>
                        <option value="Arif">Arif Azad</option>
                        <option value="HumayunAhmed">Humayun Ahmed</option>
                        <option value="ZaforIqbal">Mohammad Zafor Iqbal</option>
                        <option value="Shakespear">William Shakespear</option>
                        <option value="Bhagat">Chetan Bhagat</option>
                        <option value="toriyama">Akira Toriyama</option>
                      </select>
                    </div>
                  </div>
                  <p className="p">
                    <span className="span">Book Author </span>{" "}
                    <span className="text-wrapper-2">*</span>
                  </p>
                </div>
                <div className="email">What is the offering?</div>
                <p className="form-control-2">
                  <span className="span">Book Type </span>{" "}
                  <span className="text-wrapper-2">*</span>
                </p>
                <p className="form-control-3">
                  <span className="span">
                    Upload the Cover Page of the Book{" "}
                  </span>{" "}
                  <span className="text-wrapper-2">*</span>
                </p>
                <div className="overlap-4">
                  <div className="input-form-control">
                    <div className="text-wrapper">
                      <input
                        className="inputPrice"
                        type="number"
                        placeholder="Enter Price"
                        onChange={(e) => {
                          setsellingprice(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <p className="form-control-4">
                    <span className="text-wrapper-3">Price </span>{" "}
                    <span className="text-wrapper-4">*</span>
                  </p>
                </div>
                <div className="overlap-5">
                  <div className="input-form-control">
                    <div className="text-wrapper">
                      <input
                        className="inputPrice"
                        type="number"
                        placeholder="Enter Price"
                        onChange={(e) => {
                          setlendingPrice(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-control-5">Price</div>
                </div>
                <div className="overlap-6">
                  <div className="input-form-control">
                    <div className="text-wrapper">
                      <input
                        className="inputPrice"
                        type="number"
                        placeholder="Enter Duration"
                        onChange={(e) => {
                          setduration(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <p className="form-control-4">
                    <span className="text-wrapper-3">Duration </span>{" "}
                    <span className="text-wrapper-4">*</span>
                  </p>
                </div>
                <div className="form-control-6">I wanna sell</div>
                <div className="form-control-7">I wanna lend</div>

                <button type="submit" className="text-wrapper-5">
                  Add your Book
                </button>
                <div className="group-wrapper">
                  <div className="group">
                    {/* <p className="drag-your-images">
                      <span className="text-wrapper-6">
                        Drag your images here, or{" "}
                      </span>
                      <span className="text-wrapper-7" onclick="browseImages()">
                        browse
                      </span>
                    </p> */}
                    <input
                    type="file"
                    id="fileInput"
                    class="group"
                     onChange={handleFileChange}
                    accept="image/jpeg, image/jpg, image/png"
                    multiple
                  />
                    <div className="supported-JPG-JPEG">
                      Supported:&nbsp;&nbsp;JPG, JPEG, PNG
                    </div>
                    
                  </div>
                  
                </div>
                
              </div>
            </form>
            <Link to="/hosting">
              <div className="book-cycle">Bookcycle</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addbook;