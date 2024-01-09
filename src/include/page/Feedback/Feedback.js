import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import emailjs from 'emailjs-com'; 
function FormExample() {
  const [value,setValue]=useState("");
  const [validated, setValidated] = useState(false);
  const [fullname,setfullname]=useState("");
  const [title,settitle]=useState("");
  const [email,setemail]=useState("");
  const [context,setcontext]=useState("");
 const sendEmail = (e) => {
    e.preventDefault();
    const data={
      fullname:fullname,
      title:title,
      email:email,
      note:context,
    }
     emailjs.send('service_wn652bj', 'template_0ldsdv5', data, '-RPdjD84z_fVDsMdM')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <div className='pg-85-t flex_center'>
      <div className='container-main row'>
        <div className='col-xl-6 col-sm-12'>
          <form  onSubmit={sendEmail}>
            <div className='row'>
                <div className='col-xl-6 col-sm-12 pd-20-10'>
                    <div className='form-input '>
                      <input type='text' onChange={(e)=>setfullname(e.target.value)} required/>
                      <label> Họ tên</label>
                      <div className='icon-item flex_center'><i class="fa-solid fa-user"></i></div>
                  </div>
                </div>
                <div className='col-xl-6 col-sm-12 pd-20-10'>
                    <div className='form-input '>
                      <input type='text'  onChange={(e)=>setemail(e.target.value)} required/>
                      <label>Email</label>
                      <div className='icon-item flex_center'><i class="fa-solid fa-envelope"></i></div>
                  </div>
                </div>
                <div className='col-xl-12 col-sm-12 pd-20-10'>
                    <div className='form-input '>
                      <input type='text' onChange={(e)=>settitle(e.target.value)} required/>
                      <label>Tiêu đề</label>
                      <div className='icon-item flex_center'><i class="fa-solid fa-heading"></i></div>
                  </div>
                </div>
                <div className='col-12 pd-20-10'>
                  <label className='mg-bt-10'>Nội dung</label><br/>
                <CKEditor
                  
                    editor={ClassicEditor}
                    data="<p></p>"
                    onReady={ editor => {
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ 
                      
                      ( event, editor ) => {
                        
                        const data = editor.getData();
                         setcontext(data)
                      } 
                  }
                    onBlur={ ( event, editor ) => {
                       
                    } }
                    onFocus={ ( event, editor ) => {
                     
                    } }
                />
                </div>
                <button className="btn-login flex_center" type="submit"><p>Gửi  </p> </button>
            </div>
          </form>
        </div>
        <div className='col-xl-6 col-sm-12'>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d251637.95196238213!2d105.6189045!3d9.779349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1699341847736!5m2!1svi!2s"
            width="600"
            height="450"
            style={{
              border: '0',
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>


      </div>

    </div>

  );
}

export default FormExample;