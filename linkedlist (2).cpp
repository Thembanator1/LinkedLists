#include "linkedlist.h"

/**
 * @brief LinkedListIterator::operator*
 * @return Return a reference to the thing in the link that we're pointing to
 */
Thing &LinkedListIterator::operator*()
{
    return ptr->value;
}

/**
 * @brief LinkedListIterator::operator++
 * Make the current iterator point to the next link in the list.
 * @return Return a reference to this object.
 */
LinkedListIterator &LinkedListIterator::operator++()
{
    ptr = ptr->next;
    return *this;
}


/**
 * @brief LinkedList::LinkedList
 * Already correct as head is set to nullptr in the header file.
 */
LinkedList::LinkedList()
{
    // This is already correct.

}

/**
 * @brief LinkedList::~LinkedList
 * Free every link in the list. Do this function last.
 */
LinkedList::~LinkedList()
{
    // Consider using functions that already exist.
    Link *next;
    while (head != NULL)
    {
        next = head->next;
        delete head;
        head = next;
    }
}

/**
 * @brief LinkedList::push_front
 * @param t
 * Push t to the front of the list
 */
void LinkedList::push_front(Thing t)
{
   Link *tmp = new Link();
   tmp->next = head;
   tmp->value = t;
   head = tmp;

}

/**
 * @brief LinkedList::pop_front
 * Remove the front item in the list
 */
void LinkedList::pop_front()
{
    Link *tmp =  head;
    head = head->next;
    delete tmp;

}

/**
 * @brief LinkedList::push_back
 * @param t
 * Add t to the back of the list
 */
void LinkedList::push_back(Thing t)
{

        Link* new_Link = new Link();


        Link *last = head;

        new_Link->value = t;


        new_Link->next = NULL;

        // 4. If the Linked List is empty,
        // then make the new Link as head
        if (head == NULL)
        {
            head = new_Link;
            return;
        }

        // 5. Else traverse till the last Link
        while (last->next != NULL)
            last = last->next;

        // 6. Change the next of last Link
        last->next = new_Link;
        return;


  /*
    Link *tmp = head;
    while(tmp->next != nullptr){
        tmp = tmp->next;
    }
    tmp->next = new Link(t);
    tmp->next = nullptr;
     */

}

/**
 * @brief LinkedList::pop_back
 * Remove the last link in the list
 */
void LinkedList::pop_back()
{
    Link *tmp = head;
  //  Link *prev = nullptr;

    if(tmp->next == NULL){
        head = head->next;
        delete tmp;
    }


    if(head == NULL){

        }else{
        Link *tmp = head;
        while(tmp->next->next != nullptr){
            tmp = tmp->next;
        }
        delete tmp->next;
        tmp->next = nullptr;
        }
}

/**
 * @brief LinkedList::size
 * @return number of items in the list
 */
size_t LinkedList::size()
{
    Link *tmp = head;
    int counter = 0;
    while(tmp != nullptr){
        tmp = tmp->next;
        counter += 1;
    }
    return counter;
}

/**
 * @brief LinkedList::front
 * @return a reference to the first item in the list
 */
Thing &LinkedList::front()
{
    return head->value;
    /*Link *tmp = head;
    return tmp->value;*/
}

/**
 * @brief LinkedList::back
 * @return a reference to the last item in the list
 */
Thing &LinkedList::back()
{
    Link *tmp = head;
    while(tmp->next->next != nullptr){
        tmp = tmp->next;
    }
    tmp = tmp->next;
    return tmp->value;


}

/**
 * @brief LinkedList::get_link
 * @param i
 * @return A pointer to the ith link
 * @throws std::out_of_range("i out of bounds") - try do this without calling size()
 */
Link *LinkedList::get_link(int i)
{

    Link *tmp = head;

    if ( i < 0 ){
        throw std::out_of_range("i out of bounds");
     }
    if    ( i == NULL ){
        return head;
     }

    else {
        for(int c = 0; c < i; ++c){
           tmp = tmp->next;
           if (tmp==nullptr)
               throw std::out_of_range("i out of bounds");


           }
    }
    return tmp;
}

/**
 * @brief LinkedList::at
 * @param i
 * @return A reference to the thing at index i
 * @throws std::out_of_range("i out of bounds") - try do this without calling size()
 */
Thing &LinkedList::at(int i)
{
    Link* tmp = get_link(i);
    // Return a reference to the value
    return tmp->value;

}

/**
 * @brief LinkedList::begin
 * @return a LinkedListIterator object referencing the first item
 */
LinkedListIterator LinkedList::begin()
{
    // Remember to implemente both LinkedListIterator::operator* and
    //   LinkedListIterator::operator++ in order to pass the test cases.
    // They are at the top of this file.

     LinkedListIterator phead;
     phead.ptr=head;
    return LinkedListIterator(phead);

}

/**
 * @brief LinkedList::end
 * @return a LinkedListIterator representing one past the last item
 * Let this be a LinkedLIstIterator with ptr equal to the nullptr
 */
LinkedListIterator LinkedList::end()
{
    return LinkedListIterator();
}

/**
 * @brief LinkedList::copy
 * @return A pointer to a copy of the list
 * Allocate a new list on the heap, then add all the items to the list.
 * Do not allocate the list on the stack, because it would be destroyed when the function ends.
 *  - See the C++ Concepts PDF example.
 */
LinkedList *LinkedList::copy()
{
    LinkedList* newList = new LinkedList;

        Link* currentNode = head;
        Link* previousNode = NULL;

        while (currentNode)
        {
            Link* newNode = new Link;
            newNode->value = currentNode->value;
            newNode->next = NULL;

            if (!newList->head)
                newList->head = newNode;

            if (previousNode)
                previousNode->next = newNode;
            previousNode = newNode;

            currentNode = currentNode->next;
        }

        return newList;





}

/**
 * @brief LinkedList::reverse
 * Reverse the list.
 *  half marks: all the values are reversed
 *  remaining marks: list is reversed by changing link pointers *only*
 *    - if it was expensive to copy Thing objects, then reversing the values would take
 *       a lot of time. If you can do it by only changing the link pointers, then it will
 *       always be fast no matter how big the thing objects are.
 *  You can do this in O(n^2) time quite easily. Try think about how you could do this in O(n) time.
 */
void LinkedList::reverse()
{
           Link* current = head;
           Link *prev = NULL, *next = NULL;

           while (current != NULL) {
               // Store next
               next = current->next;

               // Reverse current node's pointer
               current->next = prev;

               // Move pointers one position ahead.
               prev = current;
               current = next;
           }
           head = prev;
           if(current==NULL){

           }

}

