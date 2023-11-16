// push.test.js

// Import the necessary modules
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/dom';
// import { displayPushBackCode, displayPushFrontCode, displayPopBackCode, displayPopFrontCode, highlightLine, showExplanation } from './push'; // Replace with the actual file name

// Mocking the necessary DOM elements
document.body.innerHTML = `
  <div class="pop-code-container"></div>
  <div id="explanation"></div>
`;

describe('LinkedList Visualization', () => {
  test('displayPushBackCode should render the correct code and explanation', () => {
    displayPushBackCode();
    
    const codeContainer = screen.getByText('void LinkedList::push_back(Thing t)');
    const explanation = screen.getByText('push_back Function: Adds a Node to the back of the list');

    expect(codeContainer).toBeInTheDocument();
    expect(explanation).toBeInTheDocument();
  });

  test('displayPushFrontCode should render the correct code and explanation', () => {
    displayPushFrontCode();
    
    const codeContainer = screen.getByText('void LinkedList::push_front(Thing t)');
    const explanation = screen.getByText('push_back Function: Adds a Node to the back of the list');

    expect(codeContainer).toBeInTheDocument();
    expect(explanation).toBeInTheDocument();
  });

  test('displayPopBackCode should render the correct code and explanation', () => {
    displayPopBackCode();
    
    const codeContainer = screen.getByText('void LinkedList::pop_back()');
    const explanation = screen.getByText('pop_back Function: Removes the last node from the linked list if it exists, or calls "pop_front" if the list is empty.');

    expect(codeContainer).toBeInTheDocument();
    expect(explanation).toBeInTheDocument();
  });

  test('displayPopFrontCode should render the correct code and explanation', () => {
    displayPopFrontCode();
    
    const codeContainer = screen.getByText('void LinkedList::pop_front()');
    const explanation = screen.getByText('pop_front Function: Removes the first node from the linked list.');

    expect(codeContainer).toBeInTheDocument();
    expect(explanation).toBeInTheDocument();
  });

  test('highlightLine should add "highlight" class to the specified line', () => {
    document.body.innerHTML = `
      <div class="pop-code-container">
        <pre>
          <code class="popBack-line">void LinkedList::pop_back()</code>
          <code class="popBack-line">   // Some code...</code>
        </pre>
      </div>
    `;
    
    const codeLine = document.querySelector('.popBack-line');
    highlightLine(1);

    expect(codeLine).toHaveClass('highlight');
  });

  test('showExplanation should render the correct explanation text', () => {
    showExplanation(1, 'This is an explanation.');

    const explanation = screen.getByText('Line 1: This is an explanation.');
    expect(explanation).toBeInTheDocument();
  });
});
