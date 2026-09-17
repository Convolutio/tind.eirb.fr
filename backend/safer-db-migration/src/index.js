import Pocketbase from "pocketbase";
const pb = new Pocketbase("http://localhost:8090");
pb.autoCancellation(false);
async function migrate() {
    await pb.admins.authWithPassword("eirbware@enseirb-matmeca.fr", "vive_le_logiciel_libre");
    ;
    const records = await pb.collection("users").getFullList();
    const recordNumber = records.length;
    console.log(`>>>>>> migrated record 0/${recordNumber}`);
    await Promise.all(records.map(async (record, idx) => {
        if (record.parrain) {
            const data = {
                parrain: record.parrain,
                fillot: record.id
            };
            await pb.collection("adoptions").create(data);
        }
        console.log(`>>>>>> migrated record ${idx + 1}/${recordNumber}`);
    }));
}
(async () => await migrate())();
//# sourceMappingURL=index.js.map