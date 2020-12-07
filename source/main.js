(()=> {
    const canvas = {
        object  : null,
        context : null,
        width   : 0,
        height  : 0
    }

    const sleep = (milliseconds) => new Promise( (onTimeout) => setTimeout(onTimeout, milliseconds) )

    function DOMLoaded()
    {
        canvas.object = document.getElementById('screen')
        canvas.context = canvas.object.getContext('2d')

        window.addEventListener('resize', resizeCanvas, false);
        resizeCanvas()

        document.getElementById('click', Draw)
        Draw()
    }

    function resizeCanvas()
    {
        const clientRect = canvas.object.getBoundingClientRect() 
        canvas.witdth = canvas.object.width  = clientRect.width
        canvas.height = canvas.object.height = clientRect.height;
    }

    function UpdatePerimeter(n)
    {
        document.getElementById('perimeter').innerHTML = Math.floor(2 * n * Math.sin (Math.PI / n) * 10000000) / 10000000
    }

    async function Draw()
    {
        var start = 0
        while (true)
        {
            canvas.context.clearRect(200 - 200, 200 - 200, 600, 400)

            canvas.context.beginPath()
            canvas.context.fillStyle = 'red'
            canvas.context.arc(140, 170, 90, 0, 2 * Math.PI)
            canvas.context.stroke()

            const sides = parseInt(document.getElementById('sides').value)
            await DrawPolygon(canvas.context, 140, 170, sides, 90, start)
            await DrawPolygon(canvas.context, 350, 170, sides, 90, start)

            UpdatePerimeter(sides)

            await sleep(50)

            start += 5
        }
    }

    async function DrawPolygon(context, x, y, sides, radius, start)
    {
        let alfa
        let length

        alfa = 2 * Math.PI / sides
        length = 2 * radius * Math.sin(alfa / 2)
        
        angle = start * Math.PI / 180
        
        angle -= Math.PI / 2
        x += radius * Math.cos(alfa / 2) * Math.cos(angle)
        y += radius * Math.cos(alfa / 2) * Math.sin(angle)
        
        angle -= Math.PI / 2
        x += radius * Math.sin(alfa / 2) * Math.cos(angle)
        y += radius * Math.sin(alfa / 2) * Math.sin(angle) 

        angle += - Math.PI

        context.beginPath()
        context.moveTo(x,y)

        for(side = 0; side < sides; side++)
        { 
            x += length * Math.cos(angle)
            y += length * Math.sin(angle)
            context.lineTo(x,y)

            angle += alfa
        }
        context.stroke()
    }

    document.addEventListener('DOMContentLoaded', DOMLoaded)
})()

