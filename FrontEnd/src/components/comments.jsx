import React, { useState, useEffect } from 'react';
import './style/comments.css';

function Comments() {
    return ( 
        <section className='comments-section'>
            <div className="comment flex">
                <div className="comment-pfp">
                    <p>p</p>
                </div>               
                <div className="comment-container">
                    <div className="name flex">
                        <p>nama</p>
                        <p>jam</p>
                    </div>
                    <p>test</p>
                </div>
            </div>
        </section>
    );
}

export default Comments;