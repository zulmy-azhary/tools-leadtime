import React from "react";
import withModal from "../../HOC/withModal";
import type { TUnitData } from "../../types";
import { formatTime } from "../../helpers/functions";
import { LabelContent } from "../atoms";

interface Props {
  dataUnit: TUnitData;
}

const DetailUnit: React.FC<Props> = props => {
  const { dataUnit } = props;
  const waitingProcess = dataUnit.currentProcess === "Tunggu Part" || dataUnit.currentProcess === "Tunggu Teknisi";

  return (
    <div className="grid grid-cols-3 place-items-center gap-y-6">
      <LabelContent
        className="col-span-3"
        childClassName="font-semibold text-blue-500 opacity-75 dark:text-teal-400"
        label="Work Order"
        value={dataUnit.workOrder}
      />
      <LabelContent label="Nomor Polisi" value={dataUnit.plateNumber} />
      <LabelContent label="Tipe Kendaraan" value={dataUnit.carType} />
      <LabelContent label="Jenis Kerusakan" value={dataUnit.damageType} />
      <LabelContent label="Vendor" value={dataUnit.vendor} />
      <LabelContent label="Tanggal Masuk" value={dataUnit.entryDate} />
      <LabelContent label="Service Advisor" value={dataUnit.serviceAdvisor} />
      <LabelContent className="col-span-3" label="Janji Penyerahan" value={dataUnit.handOver} />
      <p className="col-span-3 text-lg">Flow Proses</p>
      {waitingProcess && <p className="col-span-3">Sedang menunggu part atau teknisi</p>}
      {!waitingProcess && (
        <div className="col-span-3 grid w-full grid-cols-3 justify-items-center">
          {dataUnit.processList.map(processItem => (
            <div key={processItem._id} className="flex flex-col items-center">
              <p className="font-semibold">{processItem.processName}</p>
              <span className="text-xs opacity-60">{processItem.status}</span>
              {processItem.status === "Selesai" && (
                <span className="text-base opacity-60">{formatTime(processItem.duration as number)}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default withModal(DetailUnit);
