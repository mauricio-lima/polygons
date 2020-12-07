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

    async function Draw()
    {
        var start = 0
        while (true)
        {
            canvas.context.clearRect(200 - 200, 200 - 200, 400, 400)

            canvas.context.beginPath()
            canvas.context.fillStyle = 'red'
            canvas.context.arc(170, 170, 100, 0, 2 * Math.PI)
            canvas.context.stroke()

            await DrawPolygon(canvas.context, 170, 170, parseInt(document.getElementById('sides').value), 100, start)
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

