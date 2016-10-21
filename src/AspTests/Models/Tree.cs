namespace AspTests.Models
{
    public class Tree
    {
        public Node root;

        public void Add(int id)
        {
            Node newNode = new Node(id);

            if (root == null)
            {
                root = newNode;
                return;
            }

            Node _current = root;
            Node _previous = null;

            while (_current != null)
            {
                if (id < _current.data)
                {
                    _previous = _current;
                    _current = _current.children == null ? null : _current.children[0];
                }
                else if (id > _current.data)
                {
                    _previous = _current;
                    _current = _current.children == null ? null : _current.children[1];
                }
                
            }

            if (_previous.children == null)
                _previous.children = new Node[2];

            if (id < _previous.data)
                _previous.children[0] = newNode;
            else
                _previous.children[1] = newNode;
        }
    }

    public class Node
    {
        public int data;
        public Node[] children;

        public Node(int id)
        {
            this.data = id;
            this.children = null;
        }

        public override string ToString()
        {
            return data.ToString();
        }
    }
}
