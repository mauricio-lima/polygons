(()=> {
    var changed

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

        document.getElementById('sides').addEventListener('change', async () => {
            changed = true
            await sleep(200)
            Draw()
        })

        window.addEventListener('resize', resizeCanvas, false);
        resizeCanvas()

        document.getElementById('redraw').addEventListener('click', Draw)
        Draw()
    }

    function resizeCanvas()
    {
        const clientRect = canvas.object.getBoundingClientRect() 
        canvas.witdth = canvas.object.width  = clientRect.width
        canvas.height = canvas.object.height = clientRect.height;
    }

    function UpdateInformation(n)
    {
        document.getElementById('perimeter').innerHTML = Math.floor(2 * n * Math.sin (Math.PI / n) * 10000000) / 10000000
        document.getElementById('alfa'     ).innerHTML = Math.floor(360 / n * 10) / 10
    }


    async function Draw()
    {
        const sides = parseInt(document.getElementById('sides').value)

        DrawStaticPolygon(sides)

        changed = false
        canvas.context.strokeStyle = 'black'

        var start = 0
        while (!changed)
        {
            canvas.context.clearRect(200 - 200, 200 - 200, 450, 400)

            canvas.context.beginPath()
            canvas.context.fillStyle = 'red'
            canvas.context.arc(140, 170, 90, 0, 2 * Math.PI)
            canvas.context.stroke()

            await DrawPolygon(canvas.context, 140, 170, sides, 90, start)
            await DrawPolygon(canvas.context, 350, 170, sides, 90, -start / 4)

            UpdateInformation(sides)

            await sleep(50)

            start += 5
        }
    }


    function DrawStaticPolygon(sides)
    {
        let alfa
        let angle
        let radius
        let x,  y
        let xo, yo

        x = xo = 650
        y = yo = 200
        radius = 170

        canvas.context.clearRect(200 - 200, 200 - 200, 900, 400)

        canvas.context.strokeStyle = '#FF0000'
        canvas.context.beginPath()
        canvas.context.arc(xo, yo, radius, 0, 2 * Math.PI)
        canvas.context.stroke()

        canvas.context.strokeStyle = 'black'
        DrawPolygon(canvas.context, x, y, sides, radius, 180)

        alfa = 2 * Math.PI / sides

        angle = 0
        canvas.context.beginPath()
        canvas.context.strokeStyle = 'gray'
        canvas.context.setLineDash([3])

        canvas.context.moveTo(xo,yo)
        angle = -Math.PI / 2 - Math.PI - alfa / 2
        x = xo + radius * Math.cos(angle)
        y = yo + radius * Math.sin(angle)
        canvas.context.lineTo(x,y)

        canvas.context.moveTo(xo,yo)
        angle = -Math.PI / 2 - Math.PI + alfa / 2
        x = xo + radius * Math.cos(angle)
        y = yo + radius * Math.sin(angle)
        canvas.context.lineTo(x,y)

        canvas.context.stroke()
        canvas.context.setLineDash([0])
        
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

