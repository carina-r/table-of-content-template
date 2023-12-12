'use strict'

{
    const $ = q => document.querySelector(q)
    const $$ = q => Array.from(document.querySelectorAll(q))
    const $on = (el, ev, fn) => {
        Array.isArray(el) ? el.forEach(ae => $on(ae, ev, fn)) : el.addEventListener(ev, fn)
        return el
    }

    const openMenuButton = $('#open-menu')
    const closeMenuButton = $('#close-menu')
    const sidebar = $('.sidebar')
    const mainContent = $('main')

    let headingListCreated = false
    let lastClickedHeadingIndex = null

    const init = () => {
        openTheSidebarByClickMenu()
        closeTheSidebarByClickX()
        moveToHeadingByClickInSidebar()
    }

    const openTheSidebarByClickMenu = () => {
        $on(openMenuButton, 'click', openMenu)
    }

    const closeTheSidebarByClickX = () => {
        $on(closeMenuButton, 'click', closeMenu)
    }

    const moveToHeadingByClickInSidebar = () => {
        const homeLink = $('.sidebar a[href="#"]')
        $on(homeLink, 'click', (event) => {
            event.preventDefault()
            lastClickedHeadingIndex = null 
            scrollToHome()
        })

        const headingLinks = $$('.sidebar li a')
        headingLinks.forEach((link, index) => {
            $on(link, 'click', (event) => {
                event.preventDefault()
                lastClickedHeadingIndex = index
                scrollToHeading(link)
            })
        })
    }

    const openMenu = () => {
        sidebar.classList.add('sidebar--visible')
        mainContent.style.paddingLeft = '30%'
        if (!headingListCreated) {
            startHeading()
            headingListCreated = true
        }
    }

    const closeMenu = () => {
        sidebar.classList.remove('sidebar--visible')
        mainContent.style.paddingLeft = '5%'

        if (lastClickedHeadingIndex !== null) {
            const targetHeading = $$('h2')[lastClickedHeadingIndex]
            if (targetHeading) {
                scrollToHeading(targetHeading)
            }
            lastClickedHeadingIndex = null
        }
    }

    const startHeading = () => {
        const h2Elements = $$('h2')
        const list = document.createElement('ul')
        h2Elements.forEach((heading, index) => {
            const listItem = document.createElement('li')
            const linkHeading = document.createElement('a')
            linkHeading.href = `#heading-${index + 1}`
            linkHeading.textContent = heading.textContent
            listItem.appendChild(linkHeading)
            list.appendChild(listItem)

            $on(linkHeading, 'click', (event) => {
                event.preventDefault()
                scrollToHeading(heading)
            })
        })
        sidebar.appendChild(list)
    }

    const scrollToHeading = (heading) => {
        heading.scrollIntoView({ behavior: 'smooth' })
    }

    const scrollToHome = () => {
        mainContent.scrollIntoView({ behavior: 'smooth' })
    }

    init()
}
