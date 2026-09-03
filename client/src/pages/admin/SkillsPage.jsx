import { useEffect, useState } from "react";
import {
  addSkill,
  createSkillCategory,
  deleteSkill,
  deleteSkillCategory,
  getSkills,
  updateSkill,
  updateSkillCategory,
} from "../../api/services";
import { ConfirmModal, Modal } from "../../components/ui/Modal";
import { EmptyState } from "../../components/ui/Primitives";

export default function SkillsPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [skillModal, setSkillModal] = useState(null);

  const load = () => getSkills().then((res) => setCategories(res.data || []));
  useEffect(() => {
    load();
  }, []);

  async function addCategory(e) {
    e.preventDefault();
    await createSkillCategory({ name, order: categories.length + 1 });
    setName("");
    load();
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">Skills</h2>
      <form onSubmit={addCategory} className="mt-6 flex max-w-xl gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New category name" required />
        <button className="rounded-xl bg-accent px-4 text-sm" type="submit">
          Add
        </button>
      </form>
      <div className="mt-8 space-y-6">
        {categories.length === 0 ? <EmptyState title="No skill categories yet" /> : null}
        {categories.map((cat) => (
          <div key={cat._id} className="glass rounded-2xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <input
                className="max-w-xs"
                defaultValue={cat.name}
                onBlur={(e) => {
                  if (e.target.value !== cat.name) updateSkillCategory(cat._id, { name: e.target.value }).then(load);
                }}
              />
              <div className="flex gap-2 text-sm">
                <button type="button" className="text-cyan" onClick={() => setSkillModal({ cat, skill: null })}>
                  Add skill
                </button>
                <button type="button" className="text-rose-400" onClick={() => setDeleteId(cat._id)}>
                  Delete category
                </button>
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              {cat.skills.map((skill) => (
                <li key={skill._id} className="flex items-center justify-between gap-3 text-sm">
                  <span>
                    {skill.name} · {skill.level}%
                  </span>
                  <span className="flex gap-3">
                    <button type="button" onClick={() => setSkillModal({ cat, skill })}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-rose-400"
                      onClick={async () => {
                        await deleteSkill(cat._id, skill._id);
                        load();
                      }}
                    >
                      Delete
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <SkillForm
        open={Boolean(skillModal)}
        data={skillModal}
        onClose={() => setSkillModal(null)}
        onSaved={() => {
          setSkillModal(null);
          load();
        }}
      />
      <ConfirmModal
        open={Boolean(deleteId)}
        title="Delete category"
        message="This removes the category and all skills inside it."
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          await deleteSkillCategory(deleteId);
          setDeleteId(null);
          load();
        }}
      />
    </div>
  );
}

function SkillForm({ open, data, onClose, onSaved }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState(80);

  useEffect(() => {
    setName(data?.skill?.name || "");
    setLevel(data?.skill?.level || 80);
  }, [data]);

  async function onSubmit(e) {
    e.preventDefault();
    if (data.skill) await updateSkill(data.cat._id, data.skill._id, { name, level });
    else await addSkill(data.cat._id, { name, level });
    onSaved();
  }

  return (
    <Modal open={open} title={data?.skill ? "Edit skill" : "Add skill"} onClose={onClose}>
      <form onSubmit={onSubmit} className="space-y-3">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Skill name" required />
        <input type="number" min={0} max={100} value={level} onChange={(e) => setLevel(Number(e.target.value))} />
        <button className="rounded-full bg-accent px-4 py-2 text-sm" type="submit">
          Save
        </button>
      </form>
    </Modal>
  );
}
