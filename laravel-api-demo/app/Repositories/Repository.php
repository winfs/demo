<?php

namespace App\Repositories;

trait Repository
{
    public function all()
    {
        return $this->model->get();
    }

    public function paginate($number = 10, $sort = 'desc', $sortColumn = 'created_at')
    {
        return $this->model->orderBy($sortColumn, $sort)->paginate($number);
    }

    public function count()
    {
        return $this->model->count();
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function store($info)
    {
        return $this->save($this->model, $info);
    }

    public function update($id, $info)
    {
        $this->model = $this->find($id);

        $this->save($this->model, $info);
    }

    public function updateColumn($id, $info)
    {
        $this->model = $this->find($id);

        foreach ($info as $key => $value) {
            $this->model->{$key} = $value;
        }

        return $this->model->save();
    }

    public function delete($id)
    {
        return $this->find($id)->delete($id);
    }

    public function save($model, $info)
    {
        $model->fill($info);

        $model->save();

        return $model;
    }
}
