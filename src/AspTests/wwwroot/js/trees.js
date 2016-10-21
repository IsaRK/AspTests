
function generateBinarySearchTree() {
    var sizeTree = $("#sizeTree").val();
    $.ajax({
        url: "/Home/GetBinarySearchTree",
        data: {
            sizeTree//20
        },
        success: function (result) {
            displayBinarySearchTree(result, sizeTree);
        }
    });
}

function displayBinarySearchTree(tree, sizeTree)
{
    var dataset = [];
    for (var i = 0; i < sizeTree*2; i = i + 2) {
        dataset.push({ id: i+1, label: i+1 });
    }

    var layoutMethod = "directed";

    var nodes = new vis.DataSet(dataset);
    //var nodes = new vis.DataSet([
    //{ id: 1, label: 'Node 1' },
    //{ id: 2, label: 'Node 2' },
    //{ id: 3, label: 'Node 3' },
    //{ id: 4, label: 'Node 4' },
    //{ id: 5, label: 'Node 5' }
    //]);

    // create an array with edges
    //var edges = new vis.DataSet([
    //    { from: 1, to: 3 },
    //    { from: 1, to: 2 },
    //    { from: 2, to: 4 },
    //    { from: 2, to: 5 }
    //]);
    
    var edgeDataSet = [];
    //In order travsersal

    populateEdges(edgeDataSet, tree);

    var edges = new vis.DataSet(edgeDataSet);

    var container = document.getElementById('mynetwork');

    var data = {
        nodes: nodes,
        edges: edges
    };

    var options = {
        layout: {
            hierarchical: {
                sortMethod: layoutMethod
            }
        },
        edges: {
            smooth: false,
            arrows: { to: false }
        }
    };

    var network = new vis.Network(container, data, options);
}

function populateEdges(edgeDataSet, tree) {
    inOrderTraversal(tree.root);

    function inOrderTraversal(node)
    {
        if (node != null && node != undefined && node.children != null)
        {
            inOrderTraversal(node.children[0]);

            if (node.children[0] != null)
                edgeDataSet.push({ from: node.data, to: node.children[0].data });
            if (node.children[1] != null)
                edgeDataSet.push({ from: node.data, to: node.children[1].data });

            inOrderTraversal(node.children[1]);
        }         
    }
}
