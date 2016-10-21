using AspTests.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace AspTests.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [Authorize]
        public IActionResult Sorts()
        {
            return View();
        }

        [Authorize]
        public IActionResult Trees()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

        public Tree GetBinarySearchTree(int sizeTree)
        {
            var tree = new Tree();
            var array = new List<int>();

            for (var i = 0; i < 2* sizeTree; i = i + 2)
            {
                array.Add(i + 1);
            }

            //shuffle originalNumber
            var rnd = new Random();
            for (var j = 0; j < array.Count; j++)
            {
                var nbRandom = rnd.Next(array.Count);
                var tmp = array[nbRandom];
                array[nbRandom] = array[j];
                array[j] = tmp;
            }

            foreach (var x in array)
            {
                tree.Add(x);
            }

            return tree;
        }
    }
}
