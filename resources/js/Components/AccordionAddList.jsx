import React from "react";
import { Disclosure } from "@headlessui/react";

const AccordionAddList = ({ editMode }) => {
    return (
        <div className="w-full ">
            <Disclosure>
                {({ open }) => (
                    <>
                        <Disclosure.Button className="w-full ">
                            <div className="flex justify-between px-4 py-2 bg-primary ">
                                <div className="flex ">
                                    {editMode && (
                                        <svg
                                            className="w-6 mr-2 text-green-500 bg-white rounded-full"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    )}

                                    <span className="select-none ">
                                        {editMode
                                            ? "Editar estado"
                                            : "Añadir a mi lista"}
                                    </span>
                                </div>

                                <svg
                                    className={`w-6 transition duration-500 ease-in-out cursor-pointer ${
                                        open ? "rotate-180 transform" : ""
                                    }   `}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </Disclosure.Button>
                        <Disclosure.Panel>
                            <form class="py-4 px-14 text-sm text-kiwi bg-secundary bg-opacity-75 rounded-b-md ">
                                <div class="flex mb-2 items-center  ">
                                    <label class="pr-2 font-bold">Estado</label>
                                    <select
                                        class=" w-full rounded-sm pl-4 py-1  text-sm focus:ring-kiwi focus:border-kiwi bg-secundary"
                                        name="watching_state_id"
                                        id="state"
                                        wire:model="fields.watching_state_id"
                                    >
                                        <option disabled selected value="0">
                                            Seleccione
                                        </option>
                                        <option value="2">Seleccione</option>
                                        {/* @foreach ($stateWatchingList as $state)
                    <option value="{{$state->id}}" >{{$state->name}}</option>
                @endforeach */}
                                    </select>
                                </div>
                                <div class="flex mb-2">
                                    <label class="pr-2 text-white">
                                        Temporada
                                    </label>
                                    <select
                                        class="px-2 rounded-sm "
                                        name="season"
                                        id="season"
                                        wire:model="fields.season"
                                    >
                                        {/* @foreach ($tvshow['seasons'] as $key => $value)
                    @if ($key != 0)
                        <option value="{{ $key }}">{{ $key }}</option>

                    @endif

                @endforeach */}
                                    </select>
                                </div>
                                <div class="flex mb-2">
                                    <label class="pr-2 text-white">
                                        Cap. Vistos
                                    </label>
                                    <input
                                        class="w-12 pl-2 pr-1 rounded-sm"
                                        type="number"
                                        min="0"
                                        name="episode"
                                    />
                                    <span class="pl-2 ">/</span>
                                    <span class="pl-2 ">
                                        {/* {{ $epForSeason }} */} 3
                                    </span>
                                </div>
                                <div class="flex mb-4">
                                    <label class="pr-2 text-white">Punt.</label>
                                    <select
                                        class="rounded-sm"
                                        name="score_id"
                                        wire:model="fields.score_id"
                                    >
                                        <option disabled selected value="0">
                                            Seleccione
                                        </option>
                                        {/* @foreach ($scoreList as $score)
                    <option value="{{$score->id}}">({{$score->id}}) {{$score->name}}</option>
                @endforeach */}
                                    </select>
                                </div>
                                {editMode && (
                                    <>
                                        <button
                                            type="button"
                                            wire:click="updateTvList({{ $oldData->id }})"
                                            class="min-w-full mb-2"
                                            color="gray"
                                        >
                                            {/* SVG Update  */}
                                            <svg
                                                class="w-4 mr-2 "
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                />
                                            </svg>
                                            Actualizar
                                        </button>

                                        <button
                                            class="min-w-full mb-2"
                                            color="gray"
                                        >
                                            {/* SVG add */}
                                            <svg
                                                class="w-4 mr-2 "
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            Añadir
                                        </button>
                                    </>
                                )}

                                {/* @if ($errors->any())
            <div class="text-red-600">
                <h2>Error, hay campos sin llenar</h2>
                <ul class="pl-4 list-disc">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif */}
                            </form>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    );
};

export default AccordionAddList;
