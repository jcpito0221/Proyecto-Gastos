import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useState, useEffect } from 'react'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({ gastos, 
    setGastos, 
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto }) => {


    const [porcentaje, setPorcentaje] = useState()
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {

        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado

        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

        setDisponible(totalDisponible)
        setGastado(totalGastado)

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 500);
    }, [gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }
    const handleREsetApp =() =>{
        const resultado = confirm('¿Deses resetear la aplicacion?')

        if (resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        } 

    }
    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje >100 ?'#DC2626':'#3B82f6',
                        trailcolor: '#f5f5f5',
                        textColor: porcentaje >100 ?'#DC2626':'#3B82f6',
                    })}
                    value={porcentaje}
                    text={`${porcentaje} % Gastado` }
                />
            </div>
            <div className='contenido-presupuesto'>
                <button className='reset-app' 
                type='button'
                onClick={handleREsetApp}

                >Resetear app</button>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo': ''}`}>
                    <span>Disponible: </span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)}
                </p>

            </div>
        </div>
    )
}

export default ControlPresupuesto