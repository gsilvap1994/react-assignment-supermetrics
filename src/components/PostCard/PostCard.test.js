import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/cjs/react-dom-test-utils.development";
import PostCard from ".";

let container = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('should render post-card when PostCard is instaciated', () => {
    act(() => {
        render(<PostCard />, container);
    })
    const postCard = document.querySelector('.post-card');
    expect(postCard).not.toBeNull();
})

it('should render header and body inside post-card', () => {
    act(() => {
        render(<PostCard />, container);
    })
    const postCard = document.querySelector('.post-card');
    expect(postCard.querySelector('.header')).not.toBeNull();
    expect(postCard.querySelector('.body')).not.toBeNull();
})

it('should render post message inside post-card body ', () => {
    const post = { message: 'Some real cool message' };
    act(() => {
        render(<PostCard post={post} />, container);
    })
    const postCard = document.querySelector('.post-card');
    const postMessage = postCard.querySelector('.body');
    expect(postMessage.textContent).toBe(post.message);
})

it('should render post date inside post-card header', () => {
    const testDate = new Date('1995-12-17T03:24:55')
    const post = { created_time: testDate };
    act(() => {
        render(<PostCard post={post} />, container);
    })
    const postCard = document.querySelector('.post-card');
    const postDate = postCard.querySelector('.header');

    // should render year
    expect(postDate.textContent.indexOf(testDate.getFullYear())).not.toBe(-1);
    // should render month
    expect(postDate.textContent.indexOf('December')).not.toBe(-1);
    // should render day before comma
    expect(postDate.textContent.split(',')[0].indexOf(testDate.getDate())).not.toBe(-1);
    // should render hours, minutes and seconds after comma
    expect(postDate.textContent.split(',')[1].indexOf(testDate.getHours())).not.toBe(-1);
    expect(postDate.textContent.split(',')[1].indexOf(testDate.getMinutes())).not.toBe(-1);
    expect(postDate.textContent.split(',')[1].indexOf(testDate.getSeconds())).not.toBe(-1);



    console.log(postDate.textContent)
})
