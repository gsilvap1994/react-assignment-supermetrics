import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/cjs/react-dom-test-utils.development";
import UserCard from ".";

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

it('should render user-card when UserCard is instaciated', () => {
    act(() => {
        render(<UserCard />, container);
    })
    const userCard = document.querySelector('.user-card');
    expect(userCard).not.toBeNull();
})

it('should render user-card with id received by props', () => {
    const id = 'user-card-id';
    act(() => {
        render(<UserCard id={id} />, container);
    })
    const userCard = document.querySelector('.user-card');
    expect(userCard.id).toBe(id);
})

it('should render user name', () => {
    const name = 'Test Name';
    act(() => {
        render(<UserCard name={name} />, container);
    })
    const userCard = document.querySelector('.user-card');
    expect(userCard.firstChild.textContent).toBe(name);
})

it('should render number of user posts', () => {
    const postCount = '10';
    act(() => {
        render(<UserCard postsCount={postCount} />, container);
    })
    const userCard = document.querySelector('.user-card');
    expect(userCard.querySelector('.count').textContent).toBe(postCount);
})
