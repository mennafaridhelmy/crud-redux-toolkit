import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPost , deletePost , updatePost} from '../redux/postsSlice';

export default function Posts() {

  const [title , setTitle] = useState('');
  const [description , setDescription] = useState('');

  const [updatedTitle , setUpdatedTitle] = useState('');
  const [updatedDescription , setUpdatedDescription] = useState('');

  const [isEdit , setIsEdit ] = useState(false);
  const [id , setId] = useState(null);
  
  const dispatch =useDispatch();
  const posts = useSelector((state) =>state.posts.items);

  return (
    <div>
        <div className='form'>
          <input 
            type='text' 
            value={title}
            placeholder='Enter Post Title' 
            onChange={(e)=>setTitle(e.target.value)}  
          />
          <input 
            type='text' 
            value={description}
            placeholder='Enter Post Desc' 
            onChange={(e)=>setDescription(e.target.value)} 
          />
          <button onClick={()=>{
            dispatch(addPost({id: posts.length + 1 ,title, description}))
            setTitle('');
            setDescription('');
          }}>Add Post</button>
        </div>

        <div className='posts'>
          {posts.length > 0 ?
            posts.map(post => 
              <div className='post' key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <button onClick={()=>{
                  setIsEdit(true);
                  setId(post.id);
                }}>Edit</button>
                <button onClick={()=>dispatch(deletePost(post.id))}>Delete</button>
                <br/>
                {isEdit && id == post.id && (
                  <div>
                    <input 
                      type='text' 
                      value={updatedTitle}
                      onChange={(e)=>{setUpdatedTitle(e.target.value)}}
                      placeholder='update title' 
                    />
                    <input 
                      type='text'
                      value={updatedDescription}
                      onChange={(e)=>{setUpdatedDescription(e.target.value)}}
                      placeholder='update description' 
                    />
                    <button onClick={()=>{
                      dispatch(updatePost({id:post.id , title: updatedTitle , description: updatedDescription}))
                      setUpdatedTitle('');
                      setUpdatedDescription('');
                      setIsEdit(false);
                    }}>Update</button>
                  </div>
                )}

              </div>
            )
            : 'there is no posts'
          }
        </div>
    </div>
  )
}
