import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import { IoCheckmarkDoneCircle } from "react-icons/io5";
import FormProduct from './FormProduct';


function AddProducts() {
  const Symbole = ["#",",","?","&","@","|","\\","/","*","$","!","%","^","~","+","-"]


  const [Title,setTitle] = useState('');
  const [ErrorTitleMess,setErrorTitleMess] = useState('');
  const TitleRef = useRef();

  const [Price,setPrice] = useState('');
  const [ErrorPriceMess,setErrorPriceMess] = useState('');
  const PriceRef = useRef();

  const [Category,setCategory] = useState('');
  const [ErrorCategoryMess,setErrorCategoryMess] = useState('');

  const [ImageReder,setImageReder] = useState();
  const [Gallary,setGallary] = useState([]);
  const [ErrorGallaryMess,setErrorGallaryMess] = useState('');

  const ImgRef = useRef();

  const [sizes,setSizes] = useState('');
  const [ErrorSizesMess,setErrorSizesMess] = useState('');

    const SizeRef = useRef();

    const [colors,setColors] = useState('');
    const [ErrorColorsMess,setErrorColorsMess] = useState('');

    const ColorRef = useRef();

    const Navigation = useNavigate();
 
  const HandleOnTitleChange = (e)=>{
    const titleVal = e.target.value
    setTitle(titleVal)

    if(isNaN(titleVal) && !Symbole.some(sym =>titleVal.includes(sym))){
        setErrorTitleMess('')
    }else if(titleVal === ''){
        setErrorTitleMess('')
    }
    else{
        setErrorTitleMess('Write Correct Product Title , must not contain of this (#_?&@|\/*+-$!%^~) and start with letter')
    }
  }
  const HandleOnPriceChange = (e)=>{
    const priceVal = e.target.value;
    setPrice(priceVal)

    if(!isNaN(priceVal)){
        setErrorPriceMess('')
    }else if(priceVal === ''){
        setErrorPriceMess('')
    }
    else{
        setErrorPriceMess('Write Correct Product Price , must contain of Number only [0-9]')
    }
  }
  const handleOnChangeCategory = (e)=>{
    const categoryVal = e.target.value;
    setCategory(categoryVal)
    setErrorCategoryMess('')
  }
  const handleOnFileChange = (e)=>{
        let imgsVal = Array.from(e.target.files).length === 0 ? Gallary :Array.from(e.target.files)

        setGallary(imgsVal)
        setErrorGallaryMess('')
        let ImgResult = [];
        const readFiles = imgsVal.map(file => {
            return new Promise((resolve, reject) => {
                const Reader = new FileReader();
                Reader.onload = (e) => {
                    ImgResult.push(e.target.result);
                    resolve();
                };
                Reader.onerror = reject;
                Reader.readAsDataURL(file);
            });
        });

        Promise.all(readFiles)
            .then(() => {
                setImageReder(ImgResult);
            })
            .catch(error => {
                console.error('Error reading files:', error);
            });
  }
  const handleOnRemoveProduct = (index)=>{
        const updatedImageReder = ImageReder.filter((_, i) => i !== index);
        setImageReder(updatedImageReder);

        const updatedGallary = Gallary.filter((_, i) => i !== index);
        setGallary(updatedGallary);

        Gallary.length === 1 && setErrorGallaryMess('Please Upload At Least One Image')
        Gallary.length === 0 && setErrorGallaryMess('Please Upload At Least One Image')

  }
  const handleOnSizeProductChange = (e)=>{
        const sizeVal = e.target.value
        setSizes(sizeVal)
        setErrorSizesMess('')
  }
  const handleOnBlurFromSize = (e)=>{
        const sizeVal = e.target.value
        setSizes((sizeVal).trim())

        if(sizeVal.split(',').length === 1 && (sizeVal.trim()).split(' ').length === 1){
            setErrorSizesMess('')
        }else{
            if(sizeVal.includes(',') && !(sizeVal.trim()).includes(' ') && !sizeVal.startsWith(',') && !sizeVal.endsWith(',')){
                setErrorSizesMess('')
            }else{
                setErrorSizesMess('Separate between each size by (,)')
            }
        }
    }
  const handleOnColorProductChange = (e)=>{
        const colorVal = e.target.value
        setColors(colorVal)
        setErrorColorsMess('')
  }
  const handleOnBlurFromColor = (e)=>{
        const colorVal = e.target.value
        setColors((colorVal).trim())

        if(colorVal.split(',').length === 1 && (colorVal.trim()).split(' ').length === 1){
            setErrorColorsMess('')
        }else{
            if(colorVal.includes(',') && !(colorVal.trim()).includes(' ') && !colorVal.startsWith(',') && !colorVal.endsWith(',')){
                setErrorColorsMess('')
            }else{
                setErrorColorsMess('Separate between each Color by (,)')
            }
        }
    }
  const HandleOnFormSubmit = async (e)=>{
    e.preventDefault();
        if((ErrorTitleMess === '' && ErrorPriceMess === '' && ErrorCategoryMess === '' && ErrorGallaryMess === '' && ErrorSizesMess === '' && ErrorColorsMess === '') && (Title !== '' && Price !== '' && Category !== '' && Gallary !==[]  && ImageReder !=='' && sizes !=='' && colors !=='')){

          //Upload Image To Cloudinary
            const formData = new FormData();
            const uploadPromises = Gallary.map(img => {
                formData.append('file', img);
                formData.append('upload_preset', 'a9klosei');

                return axios.post('https://api.cloudinary.com/v1_1/djq0k3npr/image/upload', formData)
                    .then(response => response.data.url);
            });

            let ImagesURL = []
            try {
                const urls = await Promise.all(uploadPromises);
                urls.forEach(url=>ImagesURL.push(url))
            } catch (error) {
                console.error('Error uploading images:', error);
            }

            //Separate The Size
            let sizesSplit = sizes.split(',');

            //Separate The Color
            let colorsSplit = colors.split(',');
         

            let now = new Date;
            let orderSort = now.getHours()+now.getMinutes()+now.getSeconds()+now.getDate()+now.getMonth()+now.getFullYear();

            let product = {
                "Products_Title":Title,
                "Products_Price":Price,
                "Products_Category":Category,
                "Products_images":ImagesURL,
                "Products_Sizes":sizesSplit,
                "Products_Colors":colorsSplit,
                "Order": orderSort
            }
            
                // axios.post('http://localhost:3003/Products', product).then(res=>{
                //     // Reset Form
                //     TitleRef.current.value = '';
                //     PriceRef.current.value = '';
                //     ColorRef.current.value = '';
                //     SizeRef.current.value = '';
                //     ImagesURL = []
                //     setTitle('');
                //     setPrice('')
                //     setErrorPriceMess('');
                //     setErrorTitleMess('');
                //     setCategory('');
                //     setGallary([]);
                //     setImageReder();
                //     setSizes('')
                //     setErrorSizesMess()
                //     setColors('')
                //     setErrorColorsMess()

                //     document.querySelector('.Message').style.display = 'flex'
                //     window.scrollTo(0,0);
                //     setTimeout(()=>{
                //         document.querySelector('.Message').style.display = 'none'
                //         Navigation(-1)
                //     },1500)
                //  }
                // ).catch(error=>console.log(error))
                axios.post('http://postpro.000.pe',product).then(req=>console.log(req.data))
        }else{
          let CheckInput = [];

           if(Title === '')
            CheckInput.push('Title')
           if(Price === '')
            CheckInput.push('Price')
           if(Category === '')
            CheckInput.push('Category')
           if(Gallary.length === 0)
            CheckInput.push('Gallary')
           if(sizes === '')
            CheckInput.push('sizes')
           if(colors === '')
            CheckInput.push('colors')

            CheckInput.forEach(x => {
                switch (x) {
                    case 'Title':
                        setErrorTitleMess('Please Fill The Title Of Product');
                        break;
                    case 'Price':
                        setErrorPriceMess('Please Fill The Price Of Product');
                        break;
                    case 'Category':
                        setErrorCategoryMess('Please Select a Category');
                        break;
                    case 'Gallary':
                        setErrorGallaryMess('Please Upload At Least One Image');
                        break;
                    case 'sizes':
                        setErrorSizesMess('Please Fill The Sizes Of Product');
                        break;
                    case 'colors':
                        setErrorColorsMess('Please Fill The Colors Of Product');
                        break;
                    default:
                        break;
                }
            })
        }
  }

  return (
    <>
      <div className='Message flex' style={{"--JustifyContent":"center","--Align":"center"}}>
        <div className='flex' style={{"--JustifyContent":"center","--Align":"center","--gaps":"10px","width":"100%"}}>
            <IoCheckmarkDoneCircle style={{"color":"green","fontSize":"30px"}}/>
            <h3 style={{"textTransform":"upperCase"}}>Succeeding Add Product</h3>
        </div>
      </div>
      <div className='flex topAdd' style={{"--JustifyContent":"center","--Align":"center"}}>
        <h1 style={{"color":"red"}}>Fill all the fields to add a new product!</h1>
      </div>
      <FormProduct 
        submit={(e)=>HandleOnFormSubmit(e)} 
        TitleChange={(e)=>HandleOnTitleChange(e)} 
        PriceChange={(e)=>HandleOnPriceChange(e)} 
        CategoryChange={(e)=>handleOnChangeCategory(e)} 
        FileCahnge={(e)=>handleOnFileChange(e)} 
        RemoveImg={(e)=>handleOnRemoveProduct(e)} 
        SizeChange={(e)=>handleOnSizeProductChange(e)} 
        sizeBlur={(e)=>handleOnBlurFromSize(e)}
        ColorChange={(e)=>handleOnColorProductChange(e)}
        colorBlur={(e)=>handleOnBlurFromColor(e)}

        ErrorTitle={ErrorTitleMess}
        ErrorPrice={ErrorPriceMess}
        ErrorCategory={ErrorCategoryMess}
        ErrorGallary={ErrorGallaryMess}
        ErrorSize={ErrorSizesMess}
        ErrorColor={ErrorColorsMess}

        Category={Category}
        ImageReder={ImageReder}

        TitleRef = {TitleRef}
        PriceRef = {PriceRef}
        SizeRef = {SizeRef}
        ColorRef = {ColorRef}
        ImgRef = {ImgRef}
        />
    </>
  )
}

export default AddProducts
