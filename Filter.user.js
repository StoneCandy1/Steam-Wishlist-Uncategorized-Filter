// ==UserScript==
// @name         Steam Wishlist Uncategorized Filter
// @namespace    https://github.com/
// @version      1.0
// @description  Add an uncategorized filter button to Steam Wishlist
// @author       ChatGPT
// @match        https://store.steampowered.com/wishlist/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';


    let uncategorizedMode = false;
    let filterButton = null;


    /*
     * CSS
     * 不使用 display:none，避免影响虚拟列表布局
     */
    const style = document.createElement("style");

    style.textContent = `
        .steam-uncategorized-hidden {

            opacity: 0 !important;
            max-height: 0 !important;
            overflow: hidden !important;
            pointer-events: none !important;

            margin-top: -1px !important;
            margin-bottom: -1px !important;
        }


        .steam-uncategorized-button {

            cursor: pointer;
            user-select: none;

            margin-left: 8px;

            padding: 4px 10px;

            border-radius: 3px;

            background: rgba(255,255,255,0.08);

            color: inherit;

            font-size: inherit;

        }


        .steam-uncategorized-button.active {

            background: rgba(102,192,244,0.35);

        }

    `;

    document.head.appendChild(style);



    /*
     * 获取当前已经存在于 DOM 的 Wishlist 项目
     */
    function getWishlistItems() {

        return [
            ...document.querySelectorAll(
                '[data-rfd-draggable-id^="WishlistItem-"]'
            )
        ];

    }



    /*
     * 判断项目是否没有任何 Steam 类别
     */
    function isUncategorized(item) {


        const label = [
            ...item.querySelectorAll("span")
        ].find(
            el => el.textContent.trim() === "我的类别："
        );


        if (!label)
            return false;



        /*
         * 结构：

         我的类别：
         <div>
             <button>类别</button>
         </div>

         未分类：

         我的类别：
         <div></div>

        */

        const container =
            label.nextElementSibling;


        if (!container)
            return false;


        return container.children.length === 0;

    }




    /*
     * 应用过滤
     */
    function applyFilter() {


        getWishlistItems()
            .forEach(item => {


                if (
                    uncategorizedMode &&
                    !isUncategorized(item)
                ) {

                    item.classList.add(
                        "steam-uncategorized-hidden"
                    );

                }
                else {

                    item.classList.remove(
                        "steam-uncategorized-hidden"
                    );

                }

            });

    }




    /*
     * 创建按钮
     *
     * 不依赖 hash class
     * 通过“全部”按钮定位分类区域
     */
    function createButton() {


        if (filterButton)
            return;



        const allButton =
            [
                ...document.querySelectorAll("button")
            ]
            .find(
                btn =>
                    btn.textContent.trim()
                    === "全部"
            );


        if (!allButton)
            return;



        const container =
            allButton.parentElement;


        if (!container)
            return;



        filterButton =
            document.createElement("button");


        filterButton.className =
            "steam-uncategorized-button";



        filterButton.textContent =
            "未分类";



        filterButton.onclick = function () {


            uncategorizedMode =
                !uncategorizedMode;



            filterButton.classList.toggle(
                "active",
                uncategorizedMode
            );


            applyFilter();

        };



        container.appendChild(
            filterButton
        );

    }





    /*
     * 监听 Steam 虚拟列表更新
     */
    const observer =
        new MutationObserver(
            mutations => {


                createButton();


                if (uncategorizedMode) {

                    applyFilter();

                }

            }
        );



    observer.observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );




    /*
     * 检测 Steam 分类切换
     *
     * 分类变化会导致 DOM 重建，
     * 自动关闭自定义筛选
     */
    let lastURL =
        location.href;


    setInterval(() => {


        if (location.href !== lastURL) {


            lastURL =
                location.href;


            if (uncategorizedMode) {


                uncategorizedMode =
                    false;


                if (filterButton) {

                    filterButton.classList.remove(
                        "active"
                    );

                }


                applyFilter();

            }

        }


    }, 500);




    /*
     * 初始化
     */
    setTimeout(() => {

        createButton();

        applyFilter();

    }, 3000);


})();
