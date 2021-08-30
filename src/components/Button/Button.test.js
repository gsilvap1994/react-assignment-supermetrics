import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/cjs/react-dom-test-utils.development";
import Button from ".";

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


it('should render button when button is instaciated', () => {
  act(() => {
    render(<Button />, container);
  })
  expect(document.querySelector('button')).not.toBeNull();
})

it('should render button with label received via props', () => {
  const testLabel = 'Test Label'
  act(() => {
    render(<Button label={testLabel} />, container);
  })
  expect(document.querySelector('button').textContent).toBe(testLabel);
})


// not calling onClick
// it('should call received function when button is clicked', () => {
//   const onClickFn = jest.fn();
//   act(() => {
//     render(<Button onClick={onClickFn} />, container);
//   })

//   const button = document.querySelector('button');
//   console.log(button.innerHTML)
//   act(() => {
//     for (let i = 1; i < 10; i++) {
//       button.dispatchEvent(new MouseEvent("click"), { bubbles: true });
//     }
//   })
//   expect(onClickFn).toHaveBeenCalledTimes(1);
// })


it('should render button with classes received by props', () => {
  const classes = 'class-1 class-2 class-3'
  act(() => {
    render(<Button classess={classes} />, container);
  })
  const button = document.querySelector('button');
  expect(button.classList.toString().indexOf(classes)).not.toBe(-1);
})

it('should render image if receive image', () => {
  const image = {
    src: '/assets/images/down-arrow.png',
    alt: 'Test Image'
  }
  act(() => {
    render(<Button image={image} />, container);
  })
  let button = document.querySelector('button');
  const childImgTag = button.querySelector('img');
  expect(childImgTag).not.toBeNull();
  expect(button.classList.toString().indexOf('btn-image')).not.toBe(-1);
})
