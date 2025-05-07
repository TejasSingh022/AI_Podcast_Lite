import React from 'react'

function Footer() {
  return (
    <div className='grid grid-cols-2 p-20 gap-100 bg-zinc-900 text-white'>
        <div>
            <p className='font-semibold text-2xl'>Podcast Generator</p>
            <p className='mt-2'>Generate custom AI podcasts on any topic with just a few clicks.</p>
        </div>

        <div>
            <p className='font-semibold text-xl'>Contact</p>
            <ul className='mt-1'>
                <li className='mt-1'><a href='mailto:someone@example.com'>Email: tejassingh8493@gmail.com</a></li>
                <li className='mt-1'><a href='https://www.linkedin.com/in/tejas-singh-ts27/'>Linkedin: tejas-singh-ts27</a></li>
                <li className='mt-1'><a href='https://github.com/TejasSingh022'>Github: TejasSingh022</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Footer
