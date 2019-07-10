class User < ApplicationRecord
  has_many :tasklists
  has_many :tasks, through: :tasklists
end
