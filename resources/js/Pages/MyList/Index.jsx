import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import TableList from "@/Components/TableList";
// import { usePage } from "@inertiajs/react";

const Index = ({ auth, data }) => {
    // parace que no hace falta usar usepage para obtener la data del controller

    const headers = ["Nombre", "Puntuacion", "Tipo", "Temp/Ep"];
    const fields = [
        { value: "name", label: "Nombre" },
        { value: "score_id", label: "Puntuacion" },
        { value: "type", label: "Tipo" },
        { value: "watching_state_id", label: "Estado" },
    ];

    return (
        <AppLayout auth={auth}>
            <Head>
                <title>Lista de peliculas y series</title>
                <meta
                    name="description"
                    content="Pagina principal con las peliculas mas poulares de la semana, ultimos lanzamientos, filtradas por categorias"
                />
            </Head>
            <div className="container py-20 mx-auto">
                <TableList headers={headers} data={data} fields={fields} />
            </div>
        </AppLayout>
    );
};

export default Index;
