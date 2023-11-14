/**
 * @brief LinkedList::push_back
 * @param t
 * Add t to the back of the list
 */
void LinkedList::push_back(Thing t)
{
    if(head == nullptr){
        push_front(t);
        return;
    }

    Link* tmp = head;
    while(tmp->next != nullptr){
        tmp = tmp->next;
    }
    tmp->next = new Link(t);
}

/**
 * @brief LinkedList::push_front
 * @param t
 * Push t to the front of the list
 */
void LinkedList::push_front(Thing t)
{
    Link* nl = new Link(t);
    nl->next = head;
    head = nl;
}