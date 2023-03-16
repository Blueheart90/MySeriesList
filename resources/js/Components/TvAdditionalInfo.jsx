import LogoSvg from "@/Components/svg/LogoSvg";

const TvAdditionalInfo = ({ info }) => {
    const { flags, language, name } = info.originalCountry;
    return (
        <>
            <div className="flex items-center mb-4">
                <LogoSvg className="mr-2 w-7 fill-white" />
                <h2 className="text-lg ">Información Adicional</h2>
            </div>
            <div className="space-y-4 ">
                {Object.entries(info.basic).map(([label, value], index) => (
                    <div key={index + label}>
                        <span className="block font-bold">{label}</span>
                        <span className="capitalize">{value}</span>
                    </div>
                ))}

                <div>
                    <span className="block font-bold">Pais de origen</span>
                    <img className="w-12 " src={flags.svg} alt={flags.alt} />
                </div>
                <div>
                    <a
                        className="font-bold transition-all duration-300 hover:text-secundary hover:font-bold"
                        href={info.homepage}
                    >
                        Sitio Oficial
                    </a>
                </div>
            </div>
        </>
    );
};

export default TvAdditionalInfo;
